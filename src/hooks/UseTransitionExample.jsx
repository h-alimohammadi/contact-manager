import {useDebugValue, useState, useTransition} from "react";

const UseTransitionExample = () => {
    const [value, setValue] = useState(0);
    const [list, setList] = useState([]);
    const [isPending, startTransition] = useTransition();

    const handleChange = (e) => {
    useDebugValue(isPending ? 'Online' : 'Offline');
        setValue(e.target.value);
        const numbersList = [];
        let count = 0;
        startTransition(() => {
            while (count <= 20000) {
                numbersList.push(e.target.value);
                count++;
            }
            setList(numbersList);
        });


    };

    return (
        <div className="mx-auto mt-5 d-grid gap-3 w-50">
            <h5 className="alert alert-primary text-center">
                آشنایی با هوک useTransition
            </h5>

            <input type="number" value={value} onChange={handleChange}/>
            {isPending ? "در حال بارگزاری..." : list.map((item, index) => {
                return <div key={index}>{`عدد برابر است با : ${item} 🚓`}</div>;
            })}
        </div>
    );
};

export default UseTransitionExample;
