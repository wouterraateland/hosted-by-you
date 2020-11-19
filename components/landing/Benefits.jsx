import Benefit from "./Benefit";
import Card from "components/ui/Card";

export default function Benefits() {
  return (
    <Card className="max-w-xl p-4 space-y-2">
      <h2 className="font-bold text-xl">
        Create an embedable event page for FREE
      </h2>
      <Benefit emoji="🔜" label="The fastest way to host your event" />
      <Benefit emoji="🔐" label="Your event, your data, we won't sell" />
      <Benefit
        emoji="🌍"
        label="Embed it on your website, in blog posts, or anywhere you like"
      />
      <Benefit emoji="✍️" label="Start right now by editing the event below" />
      <Benefit
        emoji="💡"
        label={
          <>
            Not sure where to start?{" "}
            <button className="text-blue-600 focus:outline-none">
              Inspire me
            </button>
          </>
        }
      />
    </Card>
  );
}
