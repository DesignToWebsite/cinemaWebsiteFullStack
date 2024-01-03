import React, { useState } from 'react';
import { Button, Modal, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import reserveSvg from "../assets/reserve.svg"


const ButtonReserve = ({date,time,id}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  // const availableSlots = [
  //   { day: 'Monday', time: '12:00 PM' },
  //   { day: 'Monday', time: '3:00 PM' },
  //   { day: 'Tuesday', time: '6:00 PM' },
  //   { day: 'Tuesday', time: '9:00 PM' },
  //   // Add more slots as needed
  // ];
  const availableSlots = [
    { day: date, time: time },
    
    // Add more slots as needed
  ];

  const handleReserveClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSlotSelect = (slot) => {
    setSelectedDateTime(slot);
  };

  const handleReservationSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle the reservation and redirection here
    console.log('Selected Date and Time:', selectedDateTime);
    // Redirect the user to the reservation page
  };

  return (
    <>
      <Button className='reserve bg-white text-dark fw-bold rounded-pill' onClick={handleReserveClick}>
              <img className='icon me-2' src={reserveSvg} alt="play icon" />
              Reserve your place  
      </Button>
      <ModelStyle aria-labelledby="contained-modal-title-vcenter"
        centered show={showModal} onHide={handleModalClose}>
        
        <Modal.Body >
          <Form onSubmit={handleReservationSubmit}>
            <div className="d-flex flex-wrap">
              {availableSlots.map((slot, index) => (
                <Card
                  key={index}
                  className={`m-2 ${
                    selectedDateTime && selectedDateTime.day === slot.day && selectedDateTime.time === slot.time
                      ? 'bg-dark text-white'
                      : 'red text-white'
                  }`}
                  style={{ cursor: 'pointer', width: '120px', border:'none' }}
                  onClick={() => handleSlotSelect(slot)}
                >
                  <CardBody className="text-center">
                    <CardStyle>
                      <div>{slot.day}</div>
                      <div>{slot.time}</div>
                    </CardStyle>
                  </CardBody>
                </Card>
              ))}
            </div>

            <ContinueRes variant="dark"  type="submit" disabled={!selectedDateTime}>
              <Link to={"/reservation/"+id}>Continue Reservation</Link>
            </ContinueRes>
          </Form>
        </Modal.Body>
      </ModelStyle>
    </>
  );
};
const ModelStyle = styled(Modal)`
  background-color:rgba(40, 40, 40, 0.179);

  .modal-content{
      background:#000000e7;
      width:fit-content;
  }  
`;
const CardBody = styled(Card.Body)`
    /* background-color:#770202; */
    /* color : white; */
    border:none;
`;
const CardStyle = styled.div`
  font-weight:600;
`;
const ContinueRes = styled(Button)`
margin : 1em 0;
  /* opacity:1;
  
  background : black;
  color : white;
  a{
    color:white !important;
    font-weight:00;
  } */

`;
export default ButtonReserve;
