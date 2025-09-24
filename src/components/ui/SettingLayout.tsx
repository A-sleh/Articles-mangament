"use client"

type ISetting = {
    title: string;
    icon: React.ReactElement;
    children: React.ReactNode;
}

export default function SettingLayout({children,icon,title}: ISetting) {

  return (
    <div className="px-3 py-1 rounded-md border-2 border-primary dark:border-primary-dark flex justify-between items-center dark:text-white">
        <div className="flex gap-2 items-center">
            {icon}
            <h3>{title}</h3>
        </div>
        {children}
    </div>
  )
}
