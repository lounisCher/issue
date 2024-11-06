"use client";
import {
  Avatar,
  Box,
  Button,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NavBar = () => {
  return (
    <nav className="mb-5 border-b px-5 py-3 shadow-md bg-slate-200">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href="/">
              <AiFillBug size={20} />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return <Skeleton width="3rem" baseColor="gray" highlightColor="white" />;
  if (status === "unauthenticated")
    return <Link className="text-slate-900 font-mono font-bold hover:text-slate-600 hover:transition-colors" href="/api/auth/signin">LogIn</Link>;
  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="ghost" radius="full" className="cursor-pointer">
              <Avatar
                src={session.user!.image!}
                fallback="?"
                size={"2"}
                radius="full"
                className="cursor-pointer"
                referrerPolicy="no-referrer"
              />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">LogOut</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

const NavLinks = () => {
  const pathName = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <ul className="flex space-x-7">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              "text-slate-900": link.href === pathName,
              "text-zinc-500": link.href !== pathName,
              "hover:text-zinc-600 transition-colors font-bold": true,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavBar;
