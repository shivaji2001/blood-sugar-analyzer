import Header from "./Header";
import "../styles/HomePgBody.css";
import MultiSelectAutocomplete from "./MultiSelectAutocomplete";
const HomePgBodytemp = () => {
   
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(e.target.value);
    }
  return (
    <div className="homepgbody">
      <form className="inputForm" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Select Date :</label>
          <input type="date" name="date"></input>
        </div>
        <div>
          <label htmlFor="thingsEaten">Type what you have eaten :</label>
          <MultiSelectAutocomplete></MultiSelectAutocomplete>
        </div>
        <div>
          <label htmlFor="fastigBS">Fasting blood sugar :</label>
          <input type="number" name="fastigBS" defaultValue={0}></input>
        </div>
        <div>
          <label htmlFor="preBreakfastBS">Pre-breakfast blood sugar :</label>
          <input type="number" name="preBreakfastBS" defaultValue={0}></input>
        </div>
        <div>
          <label htmlFor="postBreakfastBS">Post-breakfast blood sugar :</label>
          <input type="number" name="postBreakfastBS" defaultValue={0}></input>
        </div>
        <div>
          <label htmlFor="prelunchBS">Pre-lunch blood sugar :</label>
          <input type="number" name="prelunchBS" defaultValue={0}></input>
        </div>
        <div>
          <label htmlFor="postLunchBS">Post-lunch blood sugar :</label>
          <input type="number" name="postLunchBS" defaultValue={0}></input>
        </div>
        <div>
          <label htmlFor="preDinnerBS">Pre-dinner blood sugar :</label>
          <input type="number" name="preDinnerBS" defaultValue={0}></input>
        </div>
        <div>
          <label htmlFor="postDinnerBS">Post-dinner blood sugar :</label>
          <input type="number" name="postDinnerBS" defaultValue={0}></input>
        </div>
        
        <div className="action-buttons">
          <button type="submit" id="submitBtn">Save</button>
          <button type="reset" id="resetBtn">Reset</button>
        </div>
      </form>
    </div>
  );
};
export default HomePgBodytemp;
