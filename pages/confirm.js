import React from "react";
import tw from "tailwind-styled-components";
import Link from "next/link";
import Map from "./components/Map";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import RideSelector from "./components/RideSelector";

function Confirm() {
  const router = useRouter();
  const { pickup, dropoff } = router.query;

  console.log("pickup", pickup);
  console.log("Dropoff", dropoff);

  const [pickupCordinates, setPickupCordinates] = useState([0, 0]);
  const [dropoffCordinates, setDropoffCordinates] = useState([0, 0]);

  const getPickupCordinates = (pickup) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoidGhlb25lYml0Y29tcGFueSIsImEiOiJja253dzlxenkwZ2RlMm9udjNsa3F0aHExIn0.ilpwibsbLDxU9XZ0oF0AaA",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setPickupCordinates(data.features[0].center);
      });
  };

  const getDropoffCordinates = (dropoff) => {
    fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
        new URLSearchParams({
          access_token:
            "pk.eyJ1IjoidGhlb25lYml0Y29tcGFueSIsImEiOiJja253dzlxenkwZ2RlMm9udjNsa3F0aHExIn0.ilpwibsbLDxU9XZ0oF0AaA",
          limit: 1,
        })
    )
      .then((response) => response.json())
      .then((data) => {
        setDropoffCordinates(data.features[0].center);
      });
  };

  useEffect(() => {
    getPickupCordinates(pickup);
    getDropoffCordinates(dropoff);
  }, [pickup, dropoff]);

  return (
    <Wrapper>
      <ButtonContainer>
        <Link href="/search" passHref={true}>
          <BackButton src="https://img.icons8.com/ios-filled/50/000000/left.png" />
        </Link>
      </ButtonContainer>
      <Map
        pickupCordinates={pickupCordinates}
        dropoffCordinates={dropoffCordinates}
      />
      <RideContainer>
        <RideSelector
          pickupCordinates={pickupCordinates}
          dropoffCordinates={dropoffCordinates}
        />
        <ConfirmButtonContainer>
          <ConfirmButton>Confirm Uber X</ConfirmButton>
        </ConfirmButtonContainer>
      </RideContainer>
    </Wrapper>
  );
}

export default Confirm;

const Wrapper = tw.div`
    flex h-screen flex-col
`;

const BackButton = tw.img`
    h-full object-contain
`;

const ButtonContainer = tw.div`
    rounded-full absolute top-4 z-10 left-4 bg-white shadow-md cursor-pointer
`;

const RideContainer = tw.div`
    flex-1 flex flex-col h-1/2
`;

const ConfirmButtonContainer = tw.div`
    border-t-2
`;

const ConfirmButton = tw.div`
    bg-black text-white py-4 my-4 mx-4 text-center text-xl
`;
