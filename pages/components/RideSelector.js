import tw from "tailwind-styled-components";
import React, { useState, useEffect, useRef } from "react";
import { carList } from "../../data/carList";

const RideSelector = ({ pickupCordinates, dropoffCordinates }) => {
  const [rideDuration, setRideDuration] = useState(0);

  const rideDurationRef = useRef();

  useEffect(() => {
    rideDurationRef.current.rideDuration = fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCordinates[0]},${pickupCordinates[1]};${dropoffCordinates[0]},${dropoffCordinates[1]}?access_token=pk.eyJ1IjoidGhlb25lYml0Y29tcGFueSIsImEiOiJja253dzlxenkwZ2RlMm9udjNsa3F0aHExIn0.ilpwibsbLDxU9XZ0oF0AaA`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.routes);
        setRideDuration(data.routes[0].duration / 100);
      });
  }, [pickupCordinates, dropoffCordinates]);

  return (
    <Wrapper>
      <Title>Choose a ride or swipe up for more</Title>
      <CarList>
        {carList.map((car, index) => (
          <Car key={index}>
            <CarImage src={car.imgUrl} />
            <CarDetails>
              <Service>{car.service}</Service>
              <Time>5 mins away</Time>
            </CarDetails>
            <Price ref={rideDurationRef}>
              {"$" + (rideDuration * car.multiplier).toFixed(2)}
            </Price>
          </Car>
        ))}
      </CarList>
    </Wrapper>
  );
};

export default RideSelector;

const Wrapper = tw.div`
  flex-1 overflow-y-scroll flex flex-col
`;

const Title = tw.div`
  text-center text-gray-500 text-xs py-2 border-b
`;

const CarList = tw.div`
overflow-y-scroll
`;

const Car = tw.div`
  flex  p-4 items-center
`;

const CarImage = tw.img`
h-14 mr-4
`;

const CarDetails = tw.div`
  flex-1
`;

const Service = tw.div`
  text-medium
`;

const Time = tw.div`
  text-xs text-blue-500
`;

const Price = tw.div`
  text-sm
`;
