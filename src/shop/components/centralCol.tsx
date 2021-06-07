import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, useParams, useRouteMatch } from "react-router-dom"
import { AuthState } from "../../state/auth/authTypes";
import { stateType } from "../../state/store";
import { SearchBar } from "./searchBart";
import { WelcomeBanner } from "./welcomeBanner";

export const CentralCol = () => {
    let { path, url } = useRouteMatch();
    return (
        <>
            <SearchBar />
            <Switch>
                <Route path={path} exact component={WelcomeBanner} />
                <Route path={`${path}/category/:categoryId/:categoryName`} component={CategoryItemView} ></Route>
                <Route path={`${path}/:topicId`} component={Topic} >
                </Route>
            </Switch>
        </>
    )
}

interface categoryItemTile {
    id: number,
    item_name: string,
    description: string,
    price: string,
    discount: string,
    added_date: string,
    category_id: 1,
    rating: string,
    img_url: string,
    tags: string[]
}

const getItemsForCategory = async (categoryId: string, setFunction: React.Dispatch<React.SetStateAction<categoryItemTile[]>>) => {
    try {
        const req = await axios.get(`http://localhost:8000/shop/getItemsForCategory/${categoryId}`);
        // var data: = JSON.parse(req.data);
        // setFunction(data);
        var data: categoryItemTile[] = req.data;
        // data.unshift(new CategoryListType("ALL",0))
        setFunction(data);
        console.log(req);
    } catch (error) {
        console.error(error);
        //alert('Login Unsuccessful');
    }
}

const getDiscountedPrice = (price:string,discount:string) =>{
    let fPrice = parseFloat(price)
    return  (fPrice - (fPrice* parseFloat(discount)/100)).toPrecision(4)
}

const CategoryItemView = () => {
    let { categoryId, categoryName } = useParams<{ categoryId: string, categoryName: string }>();
    const initialItemList: categoryItemTile[] = [];
    const [itemList, setItemList] = useState(initialItemList);
    // let { categoryName } = useParams<{  }>();
    useEffect(() => {
        getItemsForCategory(categoryId, setItemList);
        console.log(categoryId);//localhost:8000/shop/getItemsForCategory/1
    }, [categoryId])
    return (
        <div className="bg-white mt-3 p-3">
            <h1 className="display-5 mb-2">{categoryName}</h1>
            {
                itemList.map((item, index) => {
                    return (
                        <div className="card mt-3">
                            {/* <div className="card-header">{item.item_name}</div> */}
                            <div className="card-horizontal">
                                <div className="img-square-wrapper p-1">
                                    <img src={item.img_url} style={{width:'150px',height:'150px',margin:'auto',marginBottom:'auto'}} alt="Card image cap" />
                                </div>
                                <div className="card-body">

                                    {/* <img className="card-img-start" src={item.img_url} alt={item.item_name} /> */}
                                    <h5 className="card-title font-weight-bold">{item.item_name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <span>
                                        <label className={`card-text ${item.discount != "0.00" ? 'text-danger line-through' : ''}`}>{item.price}</label>
                                        { item.discount != "0.00" && <><label className='card-text ms-2'>{getDiscountedPrice(item.price,item.discount)}</label><small className='card-text ms-1 text-success' style={{fontSize:'10px'}}>({item.discount}% off)</small></>}</span>
                                    <div className="w-100">
                                        <label>Rating: {item.rating}</label>
                                        <button className="btn btn-sm btn-warning ms-2" style={{float:'inline-end'}}>buy</button>
                                        <button className="btn btn-sm btn-warning ms-2" style={{float:'inline-end'}}><abbr className="pointer" title="cart">📌</abbr></button>
                                    </div>
                                    {/* <div className="row">
                                        <div className="card-footer">{item.item_name}</div>

                                    </div> */}
                                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export function Topic() {
    // The <Route> that rendered this component has a
    // path of `/topics/:topicId`. The `:topicId` portion
    // of the URL indicates a placeholder that we can
    // get from `useParams()`.
    let { topicId } = useParams<{ topicId: string }>();
    console.log("IDDDDDDDD --->", topicId);
    //let topicId  = "shit";

    return (
        <div className="w-25 v-25 bg-danger">
            <h1>Topics</h1>
            <h3>{topicId}</h3>
        </div>
    );
}