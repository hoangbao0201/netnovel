import { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import styles from "./ContentFormSteal.module.scss";
import { createChapterBySlugChapterNumber, createNovelByUrl } from "@/services";
import { getAccessToken } from "@/utils/cookies";

const cx = classNames.bind(styles);

export interface ContentFormStealProps {}

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const modules = {
    toolbar: null,
};

const ContentFormSteal = () => {

    const messageProgressRef = useRef<HTMLDivElement>(null)
    const [urlInput, setUrlInput] = useState<string>("")
    const [progress, setProgress] = useState<number>(0);
    const [isProgress, setIsProgress] = useState<boolean>(false);
    const [dataMessageProgress, setDataMessageProgress] = useState<string[]>([])

    // Value Form
    const eventOnChangeInputUrl = (e: any) => {
        setUrlInput(e.target.value)
    };

    const handleSubmitButtonCreatNovel = async (e: any) => {
        e.preventDefault();

        if(!urlInput) {
            return
        }
        
        try {
            const novelResponse = await createNovelByUrl(urlInput as string);
            if(novelResponse?.data.success) {

                setIsProgress(true)

                setDataMessageProgress(value => [...value, "Creact Novel - Thành công"])
                setDataMessageProgress(value => [...value, "Upload Thumbnail Novel - Thành công"])
                setProgress(1)


                const token = getAccessToken()
                for (let i = 1; i <= 99; i++) {
                    const chapterResponse = 
                    await createChapterBySlugChapterNumber(novelResponse?.data.novel.slug as string, ""+i, token as string)

                    if(chapterResponse?.data.success) {
                        setDataMessageProgress(value => [ ...value, `Upload Chương ${i} - Thành công` ])
                        setProgress(value => value + 1)
                    }
                }
            }
        } catch (error) {
            setIsProgress(false);
            setProgress(0)
        }
        
        setIsProgress(false);
        setProgress(0)
        return     
          

        // for (let i = 1; i <= 100; i++) {
        //     await new Promise((resolve) => setTimeout(resolve, 100));
        //     setDataMessageProgress(value => [Math.floor(Math.random() * 5) + "", ...value])
        //     setProgress(value => value + 1)
        // }

        // setIsProgress(false);
        // setProgress(0);

    };

    const scrollToBottom = () => {
        if (messageProgressRef.current) {
            messageProgressRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [dataMessageProgress]);
    

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("form")}>

                    <div className={cx("form-group")}>
                        <label className={cx("form-title")}>Url novel (metruyenchu)</label>
                        <input
                            className={cx("form-input")}
                            placeholder=""
                            name="urlText"
                            value={urlInput}
                            onChange={eventOnChangeInputUrl}
                        />
                    </div>

                    <div className={cx('line-progress')}>
                        {
                            isProgress && (
                                <div className={cx("progress-loading")}>
                                    <span style={{ width: `${progress}%` }}/>
                                </div>
                            )
                        }
                    </div>

                    <div className={cx("content")}>

                        <div className={cx("message-progress")}>
                            <div className={cx("box-content")}>
                                {  
                                    dataMessageProgress.map((data, index) => {
                                        return <div>{data}</div>
                                    })
                                }
                                <div ref={messageProgressRef}></div>
                            </div>
                        </div>

                        <button onClick={handleSubmitButtonCreatNovel} className={cx("button-create-novel")}>
                            Cập nhật {false && " - loading"}
                        </button>

                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default ContentFormSteal;
