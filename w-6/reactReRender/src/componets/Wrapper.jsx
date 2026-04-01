function Wrapper(){
    return(
        <div style={{display:"flex"}}>
            <Card>Hi ther</Card>
            <Card><div>Hello there</div></Card>
        </div>
    )
}

function Card({children}){
    return <div style={{
        border: "1px solid black",
        padding: 10,
        margin: 10
    }}> 
        {children}
    </div>
}

export default Wrapper