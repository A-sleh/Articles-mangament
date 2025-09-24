import Header from "@/components/layouts/Header";
import SubHeader from "@/components/layouts/SubHeader";

import SystemSettings from "./_components/SystemSettings";
import UserAvatar from "./_components/UserAvatar";
import UserInfo from "./_components/UserInfo";

export default function Settings() {
  return (
    <section className="p-4">
      <Header title={"Setting"} />
      <div className="space-y-3">
        <SubHeader title={"User information"} withUnderLine={true} />
        <div className="flex flex-col just md:flex-row gap-3  ">
          <UserAvatar />
          <UserInfo />
        </div>
        <SubHeader title={"System"} withUnderLine={true}/>
        <SystemSettings />
      </div>
    </section>
  );
}
