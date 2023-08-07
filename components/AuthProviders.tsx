"use client";
import { useState, useEffect } from "react"
import { getProviders, signIn, signOut } from 'next-auth/react'
import { Button } from ".";

type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null
}

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null)
  
  useEffect(() => {
    const fetchProviders = async () => {
      // Get all providers and their configuration details using the `getProviders` method provided by nextAuth
      const res = await getProviders();
      setProviders(res);
    }
    fetchProviders()
  }, [])

  if(providers) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, index) => (
          <Button key={index} handleClick={() => signIn(provider?.id /** sign in with the specified provider */)}
           title={`sign in by ${provider.id}`}
          />
        ))}
      </div>
    )
  }

}

export default AuthProviders