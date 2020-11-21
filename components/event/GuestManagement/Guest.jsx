import GuestStatus from "./GuestStatus";

export default function Guest({ guest, even }) {
  return (
    <tr key={guest.id} className={even ? "bg-gray-50" : "bg-white"}>
      <td className="px-4 py-2">
        <a href={`mailto:guest.email`} className="text-blue-500">
          {guest.email}
        </a>
      </td>
      <td className="px-4 py-2">
        <GuestStatus status={guest.status} />
      </td>
      <td className="px-4 py-2">
        <span
          className="bg-gray-300 text-gray-300 hover:bg-transparent hover:text-black"
          onClick={(event) => {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(event.target);
            selection.removeAllRanges();
            selection.addRange(range);
          }}
        >
          {guest.accessCode}
        </span>
      </td>
    </tr>
  );
}
