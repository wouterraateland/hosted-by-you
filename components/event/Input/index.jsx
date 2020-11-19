import Card from "components/ui/Card";

import CapacityInput from "./Capacity";
import DescriptionInput from "./Description";
import EndsAtInput from "./EndsAt";
import HostInput from "./Host";
import LocationInput from "./Location";
import OccursAtInput from "./OccursAt";
import SecurityInput from "./Security";
import TitleInput from "./Title";

export default function EventInput() {
  return (
    <Card className="p-4 space-y-8">
      <HostInput />
      <TitleInput />
      <OccursAtInput />
      <EndsAtInput />
      <LocationInput />
      <DescriptionInput />
      <CapacityInput />
      <SecurityInput />
    </Card>
  );
}
