import ReactPaginate from 'react-paginate';
import styled from 'styled-components';


const MyPaginate = styled(ReactPaginate).attrs({
    // You can redefine classes here, if you want.
    activeClassName: 'active', // default to "selected"
  })`
    margin-bottom: 2rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    list-style-type: none;
    padding: 0 5rem;
    li a {
      border-radius: 2px;
      padding: 0.5rem 0.7rem;
      border: grey 1px solid;
      cursor: pointer;
      border-color: #c7c7c7;
      color: #2f855a;
    }
    li.previous a,
    li.next a,
    li.break a {
      border-color: #c7c7c7;
      margin: 10px;
    }
    li.active a {
      background-color: #2f855a;
      border-color: transparent;
      color: white;
      min-width: 32px;
    }
    li.disabled a {
      color: grey;
    }
    li.disable,
    li.disabled a {
      cursor: default;
    }
  `;


export default MyPaginate;