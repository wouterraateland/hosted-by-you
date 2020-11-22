import Benefit from "./Benefit";
import Card from "components/ui/Card";

export default function Benefits() {
  return (
    <Card className="max-w-xl p-4 space-y-2">
      <h2 className="font-bold text-xl">
        Create an embedable event page for free
      </h2>
      <Benefit
        emoji="🔜"
        label="Host your event right away, no sign-up required"
      />
      <Benefit emoji="🔐" label="Your event, your data, we won't sell it" />
      <Benefit
        emoji="🌍"
        label="Embed the event on your website, in blog posts, anywhere you like"
      />
      <Benefit emoji="⬇️" label="Start right now by editing the event below" />
      {/* <Benefit
        emoji="💡"
        label={
          <>
            Not sure where to start?{" "}
            <button className="text-blue-600 focus:outline-none">
              Inspire me
            </button>
          </>
        }
      /> */}
    </Card>
  );
}
