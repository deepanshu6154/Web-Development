import React, { createContext, useContext } from 'react';
const MyContext = createContext(1);
const Q5 = () => (
 <>
 <p>{useContext(MyContext)}</p>
 <MyContext.Provider value={2}>
 <p>{useContext(MyContext)}</p>
 </MyContext.Provider>
 </>
);
export default Q5;