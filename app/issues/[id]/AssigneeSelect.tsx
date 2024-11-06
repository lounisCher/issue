"use client";
import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AssigneeSelect = () => {
  const {data: users, error, isLoading} = useQuery<User[]>({
    queryKey:['users'],
    queryFn:()=>axios.get("/api/users").then(res=>res.data),
    staleTime: 60 * 1000, //60secondes
    retry:3 //automatic retry 3 time if there is an error 
  });
  if(isLoading) return <Skeleton/>;
  if(error) return null;
  
  return (
    <Select.Root>
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Suggestion</Select.Label>
          {users?.map((user) => (
            <Select.Item value={user.id} key={user.id}>
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default AssigneeSelect;
