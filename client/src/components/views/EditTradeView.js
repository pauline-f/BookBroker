import React, { useState, useEffect } from 'react';
import { Button, FlexContainerVertical, TradeCard, Form, Input, Label, Spinner } from '../basic-components';
import { Redirect } from 'react-router-dom';

export const EditTradeView = ({ match }) => {
  const [redirect, setRedirect] = useState(false);
  const [trade, setTrade] = useState(null);

  useEffect(() => {
    fetch(`/api/trades/${match.params.id}`)
      .then(result => result.json())
      .then(json => setTimeout(() => setTrade(json), 200));

  }, [match.params.id]);

  const editTrade = e => {
    e.preventDefault();
    const trade_description = e.target.description.value;
    const book_condition = e.target.condition.value;

    fetch(`/api/trades/${trade.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...trade, trade_description, book_condition })
    }).then(() => setRedirect(true));
  };

  return (
    redirect
      ? <Redirect to={`/trades/${match.params.id}`} />
      : <FlexContainerVertical>
        {trade
          ? (
            <>
              <TradeCard hideButton {...trade} />
              <Form submitHandler={editTrade}>
                <Label>Description<textarea name='description' defaultValue={trade.trade_description}></textarea></Label>
                <Label>Condition<Input name='condition' type='number' max='5' min='1' defaultValue={trade.book_condition} /></Label>
                <Button>Update Trade</Button>
              </Form>
            </>
          )
          : <Spinner />}
      </FlexContainerVertical>
  )
}