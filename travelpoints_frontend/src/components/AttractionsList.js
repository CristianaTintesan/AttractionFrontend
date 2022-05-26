import React from 'react';
import {useState, useEffect} from 'react';
import AttractionCard from './AttractionCard';
import './AttractionsList.css';
import TransitionsModal from "../pages/AddModal";
import {
    getAttractionsList,
    deleteAttraction,
    updateAttraction,
} from '../services/attractionsService';
import {insertVisited} from '../services/chartService';
import TextField from '@mui/material/TextField';
import {deleteWishlist, getUser, insertWishlist} from "../services/wishlistService";

const AttractionsList = () => {
    const [attractions, setAttractions] = useState([]);
    const [userId, setUserId] = useState(0);
    const [helpRerender, setHelpRerender] = useState(false);
    let admin = (localStorage.getItem("role") === "0" && localStorage.getItem("username") !== null) ? true : false;
    const [inputText, setInputText] = useState('');
    let user = (localStorage.getItem("role")=== "1") ? true : false;

    // const userId = getUser(localStorage.getItem("username"));

    const handleRerender = async () => {
        let data = await getAttractionsList();
        data = data.sort((a, b) => a.id - b.id);
        setAttractions(data);
    };

    const handleDelete = async (id) => {
        let data = await deleteAttraction(id);
        if (data === id) {
            setHelpRerender(true);
        }
        console.log(userId);
    };

    const handleUpdate = async (
        id,
        name,
        description,
        location,
        price,
        photoUrl,
        isWish
    ) => {
        let data = await updateAttraction(
            id,
            name,
            description,
            location,
            price,
            photoUrl,
            isWish,
        );
        if (data.id === id) {
            setHelpRerender(true);
        }
    };

    //const handleFilterUserATTRACTION = async (userId) =>{
    // let dataUsers = await getWishlist();
    // let filteredDataUsers = data.filter((elem)=>elem.id===userId);
    //elementsId=[]
    //for const elem of filteredData{
    // elementsId.push(elem.attarctionId}
    // let data = await getAttaractiomnList()
    // let dataFilter = data.filter((elem)=>elementsId.includes(elem.id)
    //setAttractions(dataFileter)
    // }
    
    const handleFilter = async (input) => {
        let data = await getAttractionsList();
        let filteredAttractions = data.filter((elem) =>
            elem.name.toLowerCase().includes(input) ||
            elem.location.toLowerCase().includes(input)
        );
        setAttractions(filteredAttractions);
    };

    /*const handleWishlistFilter = async (attractionId, userId) => {
        let allWishlist = await getWishlist();
        let filterByUser = allWishlist.filter((elem)=>elem.id === userId);
        //let filterByAttraction = filterByUser.filter((elem) => elem.id === attractionId)
        setAttractions(filterByUser);
    }*/

    const insertVis = async (timestamp, id) => {
        await insertVisited(timestamp, id);
    };

    const insertUserWishlist = async (attraction_id, user_id) => {
        await insertWishlist(attraction_id, user_id);
    };

    const handleDeleteWish = async (attraction_id, user_id) => {
        let data = await deleteWishlist(attraction_id, user_id);
        if (data === user_id) {
            setHelpRerender(true);
        }
    };

    const speech = (description) => {
        const msg = new SpeechSynthesisUtterance(description);
        window.speechSynthesis.speak(msg);
    };

    async function getUserId() {
        if(user){
            let user_id= await getUser(localStorage.getItem("username"));
            setUserId(user_id.id);
            console.log(user_id.id);
        }

    }

    useEffect(() => {
        if (helpRerender === true) {
            handleRerender();
            setHelpRerender(false);
        }
    }, [helpRerender]);

    useEffect(() => {
        handleRerender();
        getUserId()
    }, []);

    useEffect(() => {
        handleFilter(inputText);
    }, [inputText]);

    return (
        <>
            {admin && <section><TransitionsModal/></section>}
            <main className="AttractionsListFlex">
                <div className="search">
                    <TextField
                        id="outlined-basic"
                        onChange={(e) => {
                            setInputText(e.target.value.toLowerCase());
                        }}
                        variant="outlined"
                        fullWidth
                        label="Search"
                    />
                </div>
                {attractions.map((el) => (
                    <AttractionCard
                        key={el.id}
                        id={el.id}
                        name={el.name}
                        description={el.description}
                        location={el.location}
                        price={el.price}
                        photoUrl={el.photoUrl}
                        isWishlist={el.isWish}
                        rating={el.rating}
                        speech={speech}
                        del={handleDelete}
                        up={handleUpdate}
                        insertVisited={insertVis}
                        wish={insertUserWishlist}
                        userId={userId}
                        delWish={handleDeleteWish}

                    />
                ))}
            </main>
        </>
    );
};

export default AttractionsList;
