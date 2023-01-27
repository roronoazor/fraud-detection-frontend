import React from 'react';


export const TransactionDetailContent = (props) => {
  
    const { transaction } = props;
    console.log(Object.keys(transaction));
    let keys = Object.keys(transaction);
    let privateKeys = ['mongo_id', 'id', 'user_id', 'unique_id', 'created_at', 'updated_at']

    const publicKeys = keys.filter(key => !privateKeys.includes(key));
    
    return (
        <>
            { publicKeys.map(key =>{
                console.log(key);

                if (typeof transaction[key] === "object" && transaction[key] !== null){
                    return Object.keys(transaction[key]).map(childKey => transaction[key][childKey]);
                }else{
                    return (
                    <p>
                    <span key={key}>
                        <strong><span>{`${key.toUpperCase().replace("_", " ")}: `}</span></strong>
                        {`${transaction[key]}`}
                    </span>
                    </p>
                    )
                }
            })}
        </>
    );

}