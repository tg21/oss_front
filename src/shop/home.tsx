import { CentralCol } from "./components/centralCol";
import { LeftCol } from "./components/leftCol";
import { ShopNavbar } from "./components/navbar"


export const HomeScreen = () => {
    // console.log('home:', path, url);
    return (
        <div className="full-screen vh-100 w-100 bg-light">
            <ShopNavbar />
            <div className='row mt-2 h-100'>
                <div className='col-md-2'>
                    <LeftCol />
                </div>
                <div className='col-md-8'>
                    <CentralCol/>
                </div>
                <div className='col-md-2'>
                    <RightCol />
                </div>
                {/* <div /> */}
            </div>
        </div>
    )
}


const RightCol = () => {
    return (
        <div className="bg-white h-100">
            Right
        </div>
    );
}