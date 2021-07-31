import { useState, useEffect } from "react";
import axios from "axios";
import Display from "./Display";

const Input = () => {
  const key = "Tmc6n4YWz2HNYzlcSDb5TkxMt3PCNbO3";
  const [userInput, setUserInput] = useState("");
  const [gifGallery, setGifGallery] = useState([]);
  const [page, SetPage] = useState(true);

  const handleSubmit = (e) => {
    let gallery = [];
    e.preventDefault();
    axios({
      url: "https://api.giphy.com/v1/gifs/search",
      method: "GET",
      dataResponse: "json",
      params: {
        api_key: key,
        q: userInput,
        limit: 10,
      },
    }).then((res) => {
      gallery = res.data.data;
      if (page) {
        setGifGallery(gallery.slice(0, 5));
        console.log(1);
      } else {
        setGifGallery(gallery.slice(5));
        console.log(2);
      }
    });
    // setUserInput("");
  };

  return (
    <div>
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="search">Search here:</label>
        <input
          type="text"
          id="search"
          value={userInput}
          onChange={(e) => {
            setUserInput(e.target.value);
          }}
        />
        <button
          onClick={() => {
            SetPage(!page);
          }}
        >
          {page ? "Next Page" : "Previous Page"}
        </button>
      </form>
      <div>
        <Display gifGallery={gifGallery} />
      </div>
    </div>
  );
};

export default Input;
