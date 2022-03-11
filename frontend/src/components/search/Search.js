import React, {useState} from 'react';
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import {useHistory} from "react-router-dom";

const Search = () => {
    const [searchWord,setSearchWord] = useState('')
    const history =useHistory()

    const submitHandler=(e)=>{
        e.preventDefault();
        if(searchWord){
            history.push(`/search/${searchWord}`)
        }else {
            history.push('/')
        }
    }
    return (

            <Form style={{display:"flex"}} className="mb-2 mr-sm-2 ml-sm-5 mt-sm-2 " onSubmit={submitHandler}>
              
              <Button variant="outline-danger" className="btn"  type="submit"  style={{ borderRadius:"40px" ,paddingTop:"5px",height:"32px"}}> Search
    
    </Button>
                  
                    <FormControl
                    style={{ borderRadius:"40px",height:"32px" }}
                    type="text" placeholder="type here to search" name="serch" onChange={(e)=>setSearchWord(e.target.value)}
                    />
              
          
            </Form>

    );
};

export default Search;