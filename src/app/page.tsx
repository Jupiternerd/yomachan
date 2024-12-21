import { Metadata } from "next";
import AuthButton from "./components/navbar/userBar";

export const metadata: Metadata = {
  title: "Yomachan",
  description: "READ BRO READ",
};

export default function HomePage() {
  return (
      <div>
          <h1>Welcome to My App</h1>
      </div>
  );
}