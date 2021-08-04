import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
const Display = (props) => {
  const { gifGallery, handleClick, num, setNum, home} = props;
  return (
    <section>
      <h2>Photos</h2>
      <div className="photos">
        {gifGallery.slice(num, num + 5).map((gifPic) => {
          return (
            <div className="displayImg" key={gifPic.id}>
              <img
                className="resultsGif"
                onClick={() => {
                  return handleClick(
                    gifPic.images.original.url,
                    gifPic.title,
                    gifPic.id
                  );
                }}
                src={gifPic.images.original.url}
                alt={gifPic.title}
              />
            </div>
          );
        })}
      </div>

      {num <= 4 ? null : (
        <button
          className="scroll"
          onClick={() => {
            setNum(num - 5);
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      )}
      {num >= gifGallery.length - 5 ? null : (
        <button
          className="scroll"
          onClick={() => {
            setNum(num + 5);
          }}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      )}

      <h3>
        Don't like what you see?{" "}
        <span className="link" onClick={() => home.current.scrollIntoView()}>
          Try another search term
        </span>{" "}
        above!
      </h3>
    </section>
  );
};

export default Display;
