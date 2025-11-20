import React from "react";
import { EditSpendForm } from "../components/SpendForm/EditSpendForm";


const EditSpendPage = ({isSpendSelected}) => {
    return (
        <EditSpendForm isSpendSelected={isSpendSelected}/>
    );
};

export default EditSpendPage;
