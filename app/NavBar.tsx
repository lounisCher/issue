"use client";
import { Avatar, Box, Button, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const { status, data: session } = useSession();

  const pathName = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <nav className="mb-5 border-b px-5 py-3 shadow-md bg-slate-200">
      <Container>
      <Flex justify={"between"}>
        <Flex align={"center"} gap={"3"}>
          <Link href="/">
            <AiFillBug size={20} />
          </Link>
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
        </Flex>

        <Box>
          {status === "authenticated" && (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="ghost" radius="full"
                className="cursor-pointer">
                <Avatar src={session.user!.image!} fallback="?" size={"2"} radius="full"
                className="cursor-pointer"
                referrerPolicy="no-referrer"
                />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                <Text size="2">
                {session.user!.email}
                </Text>
                </DropdownMenu.Label>     
                <DropdownMenu.Item>
                <Link href="/api/auth/signout">LogOut</Link>  
                </DropdownMenu.Item>           
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">LogIn</Link>
          )}
        </Box>
      </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
