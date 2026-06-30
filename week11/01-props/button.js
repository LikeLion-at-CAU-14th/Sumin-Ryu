const 재사용버튼 = (props) => {
    console.log("버튼이 받은 props: ", props)

    return (
        <button style ={{ backgroundColor: props.배경색, color: "white", padding: "8px 16px", margin:"4px", border:"none", borderRadius:"4px", cursor:"pointer", fontSize:"14px"}}>
            {props.라벨}
        </button>
    )
}