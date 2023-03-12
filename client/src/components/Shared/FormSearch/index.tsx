import classNames from "classnames/bind";
import styles from "./FormSearch.module.scss";

import { OPTIONS_ARRANGE_NT, OPTIONS_CATEGORY_NT, OPTIONS_CLASSIFY_NT, OPTIONS_GENDER_NT, OPTIONS_NUMBERCHAPTER_NT, OPTIONS_PERSONALITY_NT, OPTIONS_SCENE_NT, OPTIONS_STATUS_NT } from "@/constants";
import { useState } from "react";
import FilterItem from "@/components/Layouts/FilterItem";
import usePushQuery from "@/hook/usePushQuery";
import { useRouter } from "next/router";

const cx = classNames.bind(styles);


const Checkbox = ({ children, id, isCheck, handleOnchange } : any) => {

    const eventOnchangeCheckbox = (e : any) => {
        handleOnchange(parseInt(e.currentTarget.getAttribute("data-id")))
    }

    return (
        <span data-id={id} onClick={eventOnchangeCheckbox} className={cx("item-checkbox")}>
            <span
                className={cx("box-check", `${isCheck ? "tick" : "" }`)}>
            </span>
            {children}
        </span>
    )
}

const FormSearch = ({ queryOptions } : any) => {
    const query = usePushQuery()
    const router = useRouter()

    const [dataListCheckboxGenres, setDataListCheckboxGenres] = useState<number[]>( !!queryOptions.genres && Array.from(queryOptions.genres.split(","), Number) || []);
    const [dataListCheckboxPersonality, setDataListCheckboxPersonality] = useState<number[]>( !!queryOptions.personality && Array.from(queryOptions.personality.split(","), Number) || []);
    const [dataListCheckboxScene, setDataListCheckboxScene] = useState<number[]>( !!queryOptions.scene && Array.from(queryOptions.scene.split(","), Number) || []);
    const [dataListCheckboxClassify, setDataListCheckboxClassify] = useState<number[]>( !!queryOptions.classify && Array.from(queryOptions.classify.split(","), Number) || []);
    const [valueOptionSort, setValueOptionSort] = useState(queryOptions.sort || null);
    const [valueOptionStatus, setValueOptionStatus] = useState(queryOptions.status || null);
    const [valueOptionGender, setValueOptionGender] = useState(queryOptions.gender || null);
    const [valueOptionNumberchapter, setValueOptionNumberchapter] = useState(queryOptions.numberchapter || null);

    // Onchange Checkbox
    const eventOnchangeDataListCheckboxGenres = (valueCheckId : any) => {
        if(dataListCheckboxGenres.includes(valueCheckId)) {
            setDataListCheckboxGenres((prevState) => prevState.filter((id) => id !== valueCheckId));
        }
        else {
            setDataListCheckboxGenres((prevState) => [...prevState, valueCheckId]);
        }
    }
    const eventOnchangeDataListCheckboxPersonality = (valueCheckId : any) => {
        if(dataListCheckboxPersonality.includes(valueCheckId)) {
            setDataListCheckboxPersonality((prevState) => prevState.filter((id) => id !== valueCheckId));
        }
        else {
            setDataListCheckboxPersonality((prevState) => [...prevState, valueCheckId]);
        }
    }
    const eventOnchangeDataListCheckboxScene = (valueCheckId : any) => {
        if(dataListCheckboxScene.includes(valueCheckId)) {
            setDataListCheckboxScene((prevState) => prevState.filter((id) => id !== valueCheckId));
        }
        else {
            setDataListCheckboxScene((prevState) => [...prevState, valueCheckId]);
        }
    }
    const eventOnchangeDataListCheckboxClassify = (valueCheckId : any) => {
        if(dataListCheckboxClassify.includes(valueCheckId)) {
            setDataListCheckboxClassify((prevState) => prevState.filter((id) => id !== valueCheckId));
        }
        else {
            setDataListCheckboxClassify((prevState) => [...prevState, valueCheckId]);
        }
    }

    // Onchange Options
    const eventOnchangeValueOptionSort = (valueCheckId: any) => {
        setValueOptionSort(valueCheckId)
    }
    const eventOnchangeValueOptionStatus = (valueCheckId: any) => {
        setValueOptionStatus(valueCheckId)
    }
    const eventOnchangeValueOptionGender = (valueCheckId: any) => {
        setValueOptionGender(valueCheckId)
    }
    const eventOnchangeValueOptionNumberchapter = (valueCheckId: any) => {
        setValueOptionNumberchapter(valueCheckId)
    }
    

    const handleButtonResetListCheckbox = () => {
        setDataListCheckboxGenres([])
        setDataListCheckboxPersonality([])
        setDataListCheckboxScene([])
        setDataListCheckboxClassify([])

        setValueOptionSort(null)
        setValueOptionStatus(null)
        setValueOptionGender(null)
        setValueOptionNumberchapter(null)

        router.replace({
            pathname: router.pathname,
            query: null
        })
    }

    // query.push("genres", String('1,2,3,4'), true, true)
    const handleSearchNovels = () => {
        let queryOptionsData = {}
        // List Checkboxs
        if(dataListCheckboxGenres.length > 0) {
            queryOptionsData = {
                ...queryOptionsData,
                genres: String(dataListCheckboxGenres)
            }
        }
        if(dataListCheckboxPersonality.length > 0) {
            queryOptionsData = {
                ...queryOptionsData,
                personality: String(dataListCheckboxPersonality)
            }
        }
        if(dataListCheckboxScene.length > 0) {
            queryOptionsData = {
                ...queryOptionsData,
                scene: String(dataListCheckboxScene)
            }
        }
        if(dataListCheckboxClassify.length > 0) {
            queryOptionsData = {
                ...queryOptionsData,
                classify: String(dataListCheckboxClassify)
            }
        }

        // List Options
        if(valueOptionSort) {
            queryOptionsData = {
                ...queryOptionsData,
                sort: String(valueOptionSort)
            }
        }
        if(valueOptionStatus) {
            queryOptionsData = {
                ...queryOptionsData,
                status: String(valueOptionStatus)
            }
        }
        if(valueOptionGender) {
            queryOptionsData = {
                ...queryOptionsData,
                gender: String(valueOptionGender)
            }
        }
        if(valueOptionNumberchapter) {
            queryOptionsData = {
                ...queryOptionsData,
                numberchapter: String(valueOptionNumberchapter)
            }
        }

        router.replace({
            pathname: router.pathname,
            query: queryOptionsData
        })
        
        // console.log(queryOptionsData)
    }

    // console.log(Number([queryOptions.genres]))

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>

                <div className={cx("head-options")}>
                    
                    <div className={cx("form-checkbox")}>

                        <div className={cx("action-button")}>
                            <button onClick={handleButtonResetListCheckbox} className={cx("button-reset")}>Reset</button>
                        </div>
                        
                        <div className={cx("title-checkbox")}>Thể loại</div>
                        <div className={cx("list-checkbox")}>
                            {/* GENRES */}
                            {
                                OPTIONS_CATEGORY_NT.map((item) => {
                                    return (
                                        <Checkbox
                                            key={item.id}
                                            id={item.id}
                                            isCheck={dataListCheckboxGenres.includes(item.id) ? true : false}
                                            handleOnchange={eventOnchangeDataListCheckboxGenres}
                                        >
                                            {item.value}
                                        </Checkbox>
                                    )
                                })
                            }
                        </div>

                        <div className={cx("title-checkbox")}>Tính cách nhân vật chính</div>
                        <div className={cx("list-checkbox")}>
                            {/* PERSONALITY */}
                            {
                                OPTIONS_PERSONALITY_NT.map((item) => {
                                    return (
                                        <Checkbox
                                            key={item.id}
                                            id={item.id}
                                            isCheck={dataListCheckboxPersonality.includes(item.id) ? true : false}
                                            handleOnchange={eventOnchangeDataListCheckboxPersonality}
                                        >
                                            {item.value}
                                        </Checkbox>
                                    )
                                })
                            }
                        </div>

                        <div className={cx("title-checkbox")}>Bối cảnh thế giới</div>
                        <div className={cx("list-checkbox")}>
                            {/* SCENE */}
                            {
                                OPTIONS_SCENE_NT.map((item) => {
                                    return (
                                        <Checkbox
                                            key={item.id}
                                            id={item.id}
                                            isCheck={dataListCheckboxScene.includes(item.id) ? true : false}
                                            handleOnchange={eventOnchangeDataListCheckboxScene}
                                        >
                                            {item.value}
                                        </Checkbox>
                                    )
                                })
                            }
                        </div>

                        <div className={cx("title-checkbox")}>Lưu phái</div>
                        <div className={cx("list-checkbox")}>
                            {/* CLASSIFY */}
                            {
                                OPTIONS_CLASSIFY_NT.map((item) => {
                                    return (
                                        <Checkbox
                                            key={item.id}
                                            id={item.id}
                                            isCheck={dataListCheckboxClassify.includes(item.id) ? true : false}
                                            handleOnchange={eventOnchangeDataListCheckboxClassify}
                                        >
                                            {item.value}
                                        </Checkbox>
                                    )
                                })
                            }
                        </div>

                    </div>

                    <div className={cx("form-options")}>
                        
                        <div className={cx("list-options")}>
                            {/* ARRANGE */}
                            <FilterItem
                                name="arrange"
                                title="Sắp xếp"
                                defaultValue={OPTIONS_ARRANGE_NT.find((item : any) => item.id == valueOptionSort) || null}
                                handleOnchange={eventOnchangeValueOptionSort}
                                options={OPTIONS_ARRANGE_NT}
                            />
                            {/* STATUS */}
                            <FilterItem
                                name="status"
                                title="Trạng thái"
                                defaultValue={OPTIONS_STATUS_NT.find((item : any) => item.id == valueOptionStatus) || null}
                                handleOnchange={eventOnchangeValueOptionStatus}
                                options={OPTIONS_STATUS_NT}
                            />
                            {/* GENDER */}
                            <FilterItem
                                name="gender"
                                title="Dành cho"
                                defaultValue={OPTIONS_GENDER_NT.find((item : any) => item.id == valueOptionGender) || null}
                                handleOnchange={eventOnchangeValueOptionGender}
                                options={OPTIONS_GENDER_NT}
                            />
                            {/* NUMBERCHAPTER */}
                            <FilterItem
                                name="numberchapter"
                                title="Số lượng chapter"
                                defaultValue={OPTIONS_NUMBERCHAPTER_NT.find((item : any) => item.id == valueOptionNumberchapter) || null}
                                handleOnchange={eventOnchangeValueOptionNumberchapter}
                                options={OPTIONS_NUMBERCHAPTER_NT}
                            />
                        </div>

                    </div>

                    <div>
                        <button onClick={handleSearchNovels} className={cx("button-search")}>Tìm kiếm</button>
                    </div>

                </div>

                <div className={cx("content")}>


                </div>

            </div>
        </div>
    )
}

export default FormSearch