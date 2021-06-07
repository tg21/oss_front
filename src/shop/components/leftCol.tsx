import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";

class CategoryListType{
    
    id: number;
    category: string;
    constructor(category:string = "",id:number = -1){
        this.id = id;
        this.category = category;
    }
}

const getCategories = async (setFunction:React.Dispatch<React.SetStateAction<CategoryListType[]>>) =>{
    try{
        const req = await axios.get('http://localhost:8000/shop/getCategories');
        // var data: = JSON.parse(req.data);
        // setFunction(data);
        var data:CategoryListType[] = req.data;
        data.unshift(new CategoryListType("ALL",0))
        setFunction(data);
        // console.log(req);
       } catch (error) {
           console.error(error);
           //alert('Login Unsuccessful');
       }
}

export const LeftCol = () => {
    let { path, url } = useRouteMatch();

    const initialCategory:CategoryListType[] = [];
    const [categories,setCategories] = useState(initialCategory);
    const [selectedCategory,setSelectedCategory] = useState(0);
    useEffect(()=>{
        getCategories(setCategories);
    },[]);
    return (
        <div className="bg-white h-100">
            <p className='display-6 text-center'>Categories</p>
            <ul className="list-group border-0 p2-1">
                {
                    categories.map((item,index)=>{
                        return <Link to={`${url}/category/${item.id}/${item.category.replace(' ','')}`} onClick={()=>setSelectedCategory(item.id)} className={`list-group-item list-group-item-action w-auto mx-3 border-0 ${selectedCategory == item.id ? 'bg-warning':''}`}>{item.category}</Link>
                    //    return  <li className="list-group-item border-0">{item.category}</li>
                    })
                }
            </ul>
        </div>
    );
}