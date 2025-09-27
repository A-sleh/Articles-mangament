import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Range = {
  id: number;
  start: string;
  end: string;
};

type WorkingHours = {
  isActive: boolean;
  ranges: Range[];
};

type IUserWorkingHours = {
  userId: number;
  days: {
    sun: WorkingHours;
    mon: WorkingHours;
    tue: WorkingHours;
    wed: WorkingHours;
    thu: WorkingHours;
    sat: WorkingHours;
  };
};

type workingHoursStates = {
  usersWorkingHours: IUserWorkingHours[];
};

type DayKey = keyof IUserWorkingHours["days"];

type newRangePayload = {
  startTime: string;
  endTime: string;
  rangeId?: number;
  day: DayKey;
};

type deletePayload = {
  day: DayKey;
  rangeId: number;
};

type workingHoursActions = {
  intialUserWorkingHours: (userId: number) => void;
  addNewRange: (userId: number, body: newRangePayload) => void;
  updateRange: (userId: number, body: newRangePayload) => void;
  deleteRangeTime: (userId: number, body: deletePayload) => void;
  changeDayStatus: (userId: number, day: DayKey) => void;
  getUserWorkingHours: (userId: number) => IUserWorkingHours | undefined; // can be undefined
};

type workingHoursStore = workingHoursStates & workingHoursActions;

const intialState: IUserWorkingHours = {
  userId: 0,
  days: {
    mon: { isActive: false, ranges: [] },
    sat: { isActive: false, ranges: [] },
    sun: { isActive: false, ranges: [] },
    thu: { isActive: false, ranges: [] },
    tue: { isActive: false, ranges: [] },
    wed: { isActive: false, ranges: [] },
  },
};

export function handleIntialUserWorkingHours(
  userId: number,
  usersWorkingHours: IUserWorkingHours[]
): IUserWorkingHours[] {
  const exists = usersWorkingHours.some((u) => u.userId === userId);

  if (exists) {
    return usersWorkingHours.map((u) =>
      u.userId === userId ? { ...intialState, userId } : u
    );
  } else {
    return [...usersWorkingHours, { ...intialState, userId }];
  }
}

// Add a new time range
export function handleAddNewRange(
  user: IUserWorkingHours,
  body: newRangePayload
): IUserWorkingHours {
  return {
    ...user,
    days: {
      ...user.days,
      [body.day]: {
        ...user.days[body.day],
        isActive: true,
        ranges: [
          ...user.days[body.day].ranges,
          { id: body.rangeId , start: body.startTime, end: body.endTime },
        ],
      },
    },
  };
}

// Update an existing time range
export function handleUpdateRange(
  user: IUserWorkingHours,
  body: newRangePayload
): IUserWorkingHours {
  return {
    ...user,
    days: {
      ...user.days,
      [body.day]: {
        ...user.days[body.day],
        ranges: user.days[body.day].ranges.map((r) =>
          r.id === body.rangeId
            ? { ...r, start: body.startTime, end: body.endTime }
            : r
        ),
      },
    },
  };
}

// Delete a time range
export function handleDeleteRange(
  user: IUserWorkingHours,
  body: deletePayload
): IUserWorkingHours {
  return {
    ...user,
    days: {
      ...user.days,
      [body.day]: {
        ...user.days[body.day],
        ranges: user.days[body.day].ranges.filter((r) => r.id !== body.rangeId),
      },
    },
  };
}

//Handle toggle activate of user day
export function handleToggleActivateUserDay(
  user: IUserWorkingHours,
  day: DayKey
): IUserWorkingHours {
  return {
    ...user,
    days: {
      ...user.days,
      [day]: {
        ...user.days[day],
        isActive: !user.days[day].isActive ,
      },
    },
  };
}

export const useWorkingHours = create<workingHoursStore>()(
  persist(
    (set, get) => ({
      usersWorkingHours: [],

      intialUserWorkingHours: (userId) =>
        set((state) => ({
          usersWorkingHours: handleIntialUserWorkingHours(
            userId,
            state.usersWorkingHours
          ),
        })),

      addNewRange: (userId, body) =>
        set((state) => ({
          usersWorkingHours: state.usersWorkingHours.map((user) =>
            user.userId === userId ? handleAddNewRange(user, body) : user
          ),
        })),

      updateRange: (userId, body) =>
        set((state) => ({
          usersWorkingHours: state.usersWorkingHours.map((user) =>
            user.userId === userId ? handleUpdateRange(user, body) : user
          ),
        })),

      deleteRangeTime: (userId, body) =>
        set((state) => ({
          usersWorkingHours: state.usersWorkingHours.map((user) =>
            user.userId === userId ? handleDeleteRange(user, body) : user
          ),
        })),
      changeDayStatus: (userId, day) =>
        set((state) => ({
          usersWorkingHours: state.usersWorkingHours.map((user) =>
            user.userId === userId
              ? handleToggleActivateUserDay(user, day)
              : user
          ),
        })),

      getUserWorkingHours: (userId) =>
        get().usersWorkingHours.find((u) => u.userId === userId),
    }),
    {
      name: "working-hours",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
