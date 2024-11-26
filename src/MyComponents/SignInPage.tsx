import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { LogInForm, SignInForm } from "./integratedComponents/LoginForm";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
  const [EntryState, setEntryState] = useState<"login" | "sign up">("login");
  function SignUpEntryState() {
    setEntryState("sign up");
  }
  function LoginEntryState() {
    setEntryState("login");
  }
  const navigate = useNavigate();

  return (
    <>
      <div className="h-screen border items-center flex justify-center  bg-[linear-gradient(to_right,#80808020_1px,transparent_1px),linear-gradient(to_bottom,#80808020_1px,transparent_1px)] bg-[size:25px_25px] z-0">
        {EntryState === "sign up" && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: "-20px" }}
              animate={{ opacity: 1, x: "0px" }}
              exit={{ opacity: 0, x: "20px" }}
              transition={{ duration: 0.21 }}
            >
              <Card>
                <CardHeader className="text-center font-bold text-2xl">
                  SIGN UP
                </CardHeader>
                <CardContent className=" w-[40vw] max-w-[25rem] space-y-4  ">
                  <SignInForm></SignInForm>
                  <div className=" w-full text-center space-x-3 ">
                    <Label className="font-extralight ">have an account?</Label>

                    <Button
                      className=" outline-dashed outline-2 m-0"
                      variant="link"
                      onClick={() => {
                        console.log(EntryState);
                        LoginEntryState();
                      }}
                    >
                      LOGIN
                    </Button>
                  </div>{" "}
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </motion.div>{" "}
          </AnimatePresence>
        )}

        {EntryState === "login" && (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, x: "20px" }}
              animate={{ opacity: 1, x: "0px" }}
              exit={{ opacity: 0, x: "-20px" }}
              transition={{ duration: 0.21 }}
            >
              <Card>
                <CardHeader className="text-2xl font-bold text-center">
                  <div
                    onClick={() => {
                      navigate("/home");
                    }}
                  >
                    LOGIN
                  </div>
                </CardHeader>
                <CardContent className=" w-[40vw] max-w-[25rem] space-y-4">
                  <LogInForm></LogInForm>
                  <div className=" w-full text-center space-y-2">
                    <Label className="font-extralight ">
                      Dont have an account?
                    </Label>
                    <Button
                      className="m-0"
                      variant="link"
                      onClick={() => {
                        console.log(EntryState);
                        SignUpEntryState();
                      }}
                    >
                      SIGN UP
                    </Button>
                  </div>
                </CardContent>
                <CardFooter></CardFooter>
              </Card>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </>
  );
}
