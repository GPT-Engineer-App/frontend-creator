import React, { useState } from "react";
import { ChakraProvider, Box, Text, Button, Input, VStack, Heading, useToast, Container, FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const API_BASE_URL = "https://backengine-oi7c.fly.dev";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleLogin = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setIsLoggedIn(true);
        toast({
          title: "Login Successful",
          description: "You're now logged in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login Failed",
          description: data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        toast({
          title: "Signup Successful",
          description: "You're now signed up. Please log in.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const data = await response.json();
        toast({
          title: "Signup Failed",
          description: data.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: "An unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEmailError = email === "";
  const isPasswordError = password === "";

  return (
    <ChakraProvider>
      <Container centerContent>
        <Box p={6} borderWidth="1px" borderRadius="lg" m={4} w="100%" maxW="md">
          <VStack spacing={4} align="stretch">
            <Heading size="lg">{isLoggedIn ? "Welcome!" : "Please Log In or Sign Up"}</Heading>
            {!isLoggedIn && (
              <>
                <FormControl isInvalid={isEmailError}>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  {isEmailError && <FormErrorMessage>Email is required.</FormErrorMessage>}
                </FormControl>
                <FormControl isInvalid={isPasswordError}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  {isPasswordError && <FormErrorMessage>Password is required.</FormErrorMessage>}
                </FormControl>
                <Button leftIcon={<FaSignInAlt />} colorScheme="teal" variant="solid" isFullWidth isLoading={isSubmitting} isDisabled={isEmailError || isPasswordError} onClick={handleLogin}>
                  Login
                </Button>
                <Button leftIcon={<FaUserPlus />} colorScheme="blue" variant="outline" isFullWidth isLoading={isSubmitting} isDisabled={isEmailError || isPasswordError} onClick={handleSignup}>
                  Signup
                </Button>
              </>
            )}
            {isLoggedIn && <Text>Congratulations! You're now logged in. Use the application as you see fit.</Text>}
          </VStack>
        </Box>
      </Container>
    </ChakraProvider>
  );
};

export default Index;
