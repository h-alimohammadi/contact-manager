import { useState, useEffect } from "react";

const CustomHooks = () => {
  const [showUsers, setShowUsers] = useState(false);

  return (
    <div className="mx-auto mt-5 d-grid gap-3 w-50">
      <h5 className="alert alert-danger text-center">
        آشنایی با هوک های شخصی سازی شده
      </h5>

      <hr className="bg-dark" />
      <button
        className="btn btn-block btn-success"
        /* onClick={() => setShowUsers((prevShowUsers) => !prevShowUsers)} */
      >
        نمایش کاربران عزیز 😇
      </button>

      {/* {showUsers */}
      {/*   ? users.map((user, index) => ( */}
      {/*       <div key={index}> */}
      {/*         <p className="alert alert-light">{`نام : ${user.name}`}</p> */}
      {/*       </div> */}
      {/*     )) */}
      {/*   : null} */}
    </div>
  );
};

export default CustomHooks;
