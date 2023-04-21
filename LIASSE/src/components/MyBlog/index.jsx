import React from 'react';
import './BlogPageMine.css';

function MyBlog() {

    const typeButtonClicked1 = ()=>{
        const button = document.querySelector('.typebutton-blog1');

        if(button.style.backgroundColor == 'white'){
            button.style.backgroundColor = '#000';
            button.style.border= 'none';
            button.style.color = 'white';
        }
        else {
           button.style.backgroundColor = 'white';
           button.style.border= '1px solid #000';
           button.style.color = '#000';
        }
    }
    const typeButtonClicked2 = ()=>{
        const button = document.querySelector('.typebutton-blog2');

        if(button.style.backgroundColor == 'white'){
            button.style.backgroundColor = '#000';
            button.style.border= 'none';
            button.style.color = 'white';
        }
        else {
           button.style.backgroundColor = 'white';
           button.style.border= '1px solid #000';
           button.style.color = '#000';
        }
    }
    const typeButtonClicked3 = ()=>{
        const button = document.querySelector('.typebutton-blog3');

        if(button.style.backgroundColor == 'white'){
            button.style.backgroundColor = '#000';
            button.style.border= 'none';
            button.style.color = 'white';
        }
        else {
           button.style.backgroundColor = 'white';
           button.style.border= '1px solid #000';
           button.style.color = '#000';
        }
    }
    const typeButtonClicked4 = ()=>{
        const button = document.querySelector('.typebutton-blog4');
        
        if(button.style.backgroundColor == 'white'){
            button.style.backgroundColor = '#000';
            button.style.border= 'none';
            button.style.color = 'white';
        }
        else {
           button.style.backgroundColor = 'white';
           button.style.border= '1px solid #000';
           button.style.color = '#000';
        }
    }

    return(
        <div style={{marginTop:"120px"}}>
            <div class="container-blog">
        <div class="A-blog">
            <h1><center>My Post</center></h1>
            <hr class="hr-myblog"/>
            <div class="search-container-blog">
                <form class="form-blog" action="/search">
                <input class="input-blog" type="text" placeholder="Search..."/>
                  <button class="button-blog" type="submit">Search</button>
                </form>
            </div>
            <div class="type-container-blog">
                
                <div class="buttons-blog">
                    <label for="Type">Filter by type: </label>
                    <button class="typebutton-blog1" onClick={typeButtonClicked1}>Artical</button>
                    <button class="typebutton-blog2" onClick={typeButtonClicked2}>These</button>
                    <button class="typebutton-blog3" onClick={typeButtonClicked3}>type3</button>
                    <button class="typebutton-blog4" onClick={typeButtonClicked4}>type4</button>
                </div>
                  
            </div>
        </div>
        <hr class="hr-blog"/>
        <div class="B-blog">
            <div class="BlogBanner-blog">
                <h3>Blog Title 1</h3>
                <p>Lorem ipsum dolor sit amet consectetur 
                    adipisicing elit. Culpa, itaque. Molestias
                    hic deleniti repellat labore nam assumenda, 
                    a id officia pariatur vitae odio natus quasi
                    obcaecati voluptatum consequuntur aperiam sed? <a href="https://www.kooora.com">know more</a></p>
            </div>
            <div class="BlogBanner-blog">
                <h3>Blog Title 1</h3>
                <p>Lorem ipsum dolor sit amet consectetur 
                    adipisicing elit. Culpa, itaque. Molestias
                    hic deleniti repellat labore nam assumenda, 
                    a id officia pariatur vitae odio natus quasi
                    obcaecati voluptatum consequuntur aperiam sed? <a href="https://www.kooora.com">know more</a></p>
            </div>
            <div class="BlogBanner-blog">
                <h3>Blog Title 1</h3>
                <p>Lorem ipsum dolor sit amet consectetur 
                    adipisicing elit. Culpa, itaque. Molestias
                    hic deleniti repellat labore nam assumenda, 
                    a id officia pariatur vitae odio natus quasi
                    obcaecati voluptatum consequuntur aperiam sed? <a href="https://www.kooora.com">know more</a></p>
            </div>
            <div class="BlogBanner-blog">
                <h3>Blog Title 1</h3>
                <p>Lorem ipsum dolor sit amet consectetur 
                    adipisicing elit. Culpa, itaque. Molestias
                    hic deleniti repellat labore nam assumenda, 
                    a id officia pariatur vitae odio natus quasi
                    obcaecati voluptatum consequuntur aperiam sed? <a href="https://www.kooora.com">know more</a></p>
            </div>
            <div class="BlogBanner-blog">
                <h3>Blog Title 1</h3>
                <p>Lorem ipsum dolor sit amet consectetur 
                    adipisicing elit. Culpa, itaque. Molestias
                    hic deleniti repellat labore nam assumenda, 
                    a id officia pariatur vitae odio natus quasi
                    obcaecati voluptatum consequuntur aperiam sed? <a href="https://www.kooora.com">know more</a></p>
            </div>
            <div class="BlogBanner-blog">
                <h3>Blog Title 1</h3>
                <p>Lorem ipsum dolor sit amet consectetur 
                    adipisicing elit. Culpa, itaque. Molestias
                    hic deleniti repellat labore nam assumenda, 
                    a id officia pariatur vitae odio natus quasi
                    obcaecati voluptatum consequuntur aperiam sed? <a href="https://www.kooora.com">know more</a></p>
            </div>
            <div class="BlogBanner-blog">
                <h3>Blog Title 1</h3>
                <p>Lorem ipsum dolor sit amet consectetur 
                    adipisicing elit. Culpa, itaque. Molestias
                    hic deleniti repellat labore nam assumenda, 
                    a id officia pariatur vitae odio natus quasi
                    obcaecati voluptatum consequuntur aperiam sed? <a href="https://www.kooora.com">know more</a></p>
            </div>
            <div class="BlogBanner-blog">
                <h3>Blog Title 1</h3>
                <p>Lorem ipsum dolor sit amet consectetur 
                    adipisicing elit. Culpa, itaque. Molestias
                    hic deleniti repellat labore nam assumenda, 
                    a id officia pariatur vitae odio natus quasi
                    obcaecati voluptatum consequuntur aperiam sed? <a href="https://www.kooora.com">know more</a></p>
            </div>
           
        </div>
    </div>
        </div>
    );
  }
  
  export default MyBlog