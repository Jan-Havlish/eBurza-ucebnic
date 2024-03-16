import updateRecord from "../services/db/updateRecord";
import PropTypes from "prop-types";

const Finish = (props) => {
  const { amITaker } = props;
  const writeFinish = async () => {
    await updateRecord("books", props.book.BookID, {
      ...props.book,
      shoppingState: 4,
      stillOnSale: false,
    });
  }
  return (
    <div>
      <h3>
        Teď vám zbývá jen přijít na dohodnuté místo, v dohodnutý čas a směnit
        učebnici za dohodnutou částku.
      </h3>{" "}
      <h4>Po té příjemce učebnice zde potvrdí příjem učebnice. </h4>
      {amITaker && <button className="red-button" onClick={writeFinish}>Potvrdit přijetí</button>}
    </div>
  );
};

export default Finish;

Finish.propTypes = {
  amITaker: PropTypes.bool.isRequired,
  book: PropTypes.object.isRequired,
}