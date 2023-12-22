"use client";

import Skeleton from "@/app/components/Skeleton"
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

const NavBar = () => {

  return (
    <nav className="py-4 items-center px-5 border-b">
      <Container>
        <Flex justify="between">
          <Flex gap="6" align="center">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
    const currentPath = usePathname();
    const links = [
      { label: "Dashboard", href: "/" },
      { label: "Issues", href: "/issues/list" },
    ];
    
  return (<ul className="flex space-x-6">
    {links.map((link) => (
      <li key={link.href}>
        <Link
          href={link.href}
          className={classNames({
            "nav-link" : true,
            "!text-zinc-800 font-semibold": currentPath === link.href,
          })}
        >
          {link.label}
        </Link>
      </li>
    ))}
  </ul>)
}

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return <Link href="/api/auth/signin" className="nav-link">Login</Link>;

  return (
    <Box>
    {status === "authenticated" && (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    )}
    </Box>
  )
}

export default NavBar;
