import {forwardRef, useImperativeHandle, useRef} from "react";

const Input = forwardRef((props, ref) => {
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => {
        return {
            focus() {
                inputRef.current.focus();
            }
        }
    }, []);
    return <input {...props} ref={inputRef}/>
});


const UseImperativeHandleExample = () => {
    const inputRef = useRef(null);

    const handleFocus = () => {
        inputRef.current.focus();
    };

    return (
        <div className="mx-auto mt-5 d-grid gap-3 w-50">
            <h5 className="alert alert-success text-center">
                آشنایی با هوک useImperativeHandle
            </h5>

            <hr className="bg-danger"/>

            {/*<input type="text" className="form-control" ref={inputRef} />*/}
            <Input type="text" className="form-control" ref={inputRef}/>
            <button className="btn btn-block btn-success" onClick={handleFocus}>
                تمرکز بنما 👀{" "}
            </button>
        </div>
    );
};

export default UseImperativeHandleExample;
