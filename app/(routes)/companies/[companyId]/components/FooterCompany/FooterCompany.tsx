"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { FooterCompanyProps } from "./FooterCompany.types";

const FooterCompany = ({ companyId }: FooterCompanyProps) => {
  const { toast } = useToast();
  const router = useRouter();

  const onDeleteCompany = async () => {
    try {
      axios.delete(`/api/company/${companyId}`);
      toast({
        title: "Company deleted",
      });
      router.push("/companies");
    } catch (error) {
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-end mt-5">
      <Button
        variant="destructive"
        onClick={onDeleteCompany}
      >
        <Trash className="w-4 h-4 mr-2" />
        Remove Company
      </Button>
    </div>
  );
};

export default FooterCompany;
