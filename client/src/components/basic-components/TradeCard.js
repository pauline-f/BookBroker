import React, { useState, useEffect, useContext } from 'react';
import { Button, FlexContainerHorizontal, Pin } from './';
import { Link } from 'react-router-dom'
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';

const Heading = styled.h2`
  margin-top: 0;
  font-size: 18px;
`

const Details = styled.div`
  margin: 0;
  font-size: 12px;
`

const CardContainer = styled.div`
  width: 100%;
  margin-bottom: 15px;
  border-top: 1px solid lightgrey;
  border-bottom: 1px solid lightgrey;
  transition: 0.2s ease-in-out;
  :hover {
    box-shadow: 0 0 5px 0px #0000004f;
  }
`

const DetailsContainer = styled.div`
  width: 75%;
  position: relative;
  padding: 10px;
`

const ButtonContainer = styled.div`
  width: 100%;
  `;

const Img = styled.img`
  height: 100%;
  width: 110px;
  margin-bottom: -3px;
`

const UserLink = styled.span`
  > a {
    font-weight: 700;
    color: var(--tertiary-color-dark);
    :hover {
      text-decoration: underline;
    }
  }
`

export function TradeCard({
  id,
  goodreads_book_id,
  goodreads_author_id,
  book_title,
  book_author,
  book_publication_year,
  book_rating,
  book_image,
  trade_status,
  trade_description,
  book_condition,
  owner_id,
  onClick,
  hideButton,
  pinned,
  loggedIn
}) {

  const [owner, setOwner] = useState('');

  useEffect(() => {
    fetch(`/api/users/${owner_id}`)
      .then(data => data.json())
      .then(user => setOwner(user.username));
  }, [owner_id]);


  return (
    <CardContainer>
      <FlexContainerHorizontal>
        <div>
          <Img src={book_image} alt="book" />
        </div>

        <DetailsContainer>
          <Heading>{book_title}</Heading>
          <Details>By: {book_author}</Details>
          <Details>Published: {book_publication_year}</Details>
          <Details>Condition: {book_condition}</Details>
          <Details>Owner: <UserLink><Link to={`/profiles/${owner_id}`}>{owner}</Link></UserLink></Details>
          <Details>Status: { trade_status ? 'Completed' : 'Available' }</Details>
          <Details>Goodreads Rating:
            <StarRatings
              name="goodreads_rating"
              numberOfStars={5}
              rating={book_rating}
              starRatedColor="#df913d"
              starDimension="15px"
              starSpacing="1px"
            />
          </Details>
          {
            loggedIn && loggedIn !== owner_id
              ? <Pin tradeId={id} isPinned={pinned}/>
              : <></>
          }
          {
            hideButton
              ? <Details>Description: {trade_description}</Details>
              : <ButtonContainer>
                <Link to={`/trades/${id}`}><Button primary card onClick={onClick}>View more</Button></Link>
              </ButtonContainer>
          }
        </DetailsContainer>
      </FlexContainerHorizontal>
    </CardContainer>
  )
}
