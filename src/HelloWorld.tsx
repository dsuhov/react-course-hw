import React from "react";

interface Prop {
    username?: string;  
}

const HelloWorld: React.FC<Prop> = (props) => {
    return <h2>Hello World, {props.username}</h2>;
}

export default HelloWorld;