import { useNavigate } from "react-router-dom";
export default function FormComponent({
  formData,
  handleOnSubmit,
  handleOnChange,
  currentPage,
  nextPage,
  postResponse,
}) {
  const navigate = useNavigate(); // used to move to another page easily
  return (
    <div>
    {/* display the current page title */}
      <h1>{currentPage}</h1>
      <form onSubmit={handleOnSubmit}>
         {/* username input */}
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username} // show current
          onChange={handleOnChange} // update when types
        />
        <br />


         {/* password input */}
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password} // show current
          onChange={handleOnChange} // update when types
        />
        <br />

        <button>Submit</button>
      </form>

      {/* show response message after submit */}
      <p>{postResponse}</p>

       {/* button to navigate between login and register page */}
       {/* btw the login page use "/" so code like here*/}
      <button onClick={() => navigate(nextPage === "login" ? "/" : "/register")}>
        {nextPage === "login" ? "Go to Login Page" : "Go to Register Page"}
      </button>


    </div>
  );
}