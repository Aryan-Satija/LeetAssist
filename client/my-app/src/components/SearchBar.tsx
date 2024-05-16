"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "./lib/utils"
import { Button } from "./ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "./ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"

import { problemInterface } from "../pages/recommend"


export function SearchBar({problems, value, setValue} : {problems: problemInterface[], value: string, setValue: (arg: string) => void}) {
  const [open, setOpen] = React.useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="text-slate-300 rounded-md">
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[300px] justify-between"
        >
          {value
            ? value
            : "Select problem..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 text-slate-300 rounded-md bg-black bg-opacity-40 backdrop-blur-md">
        <Command>
          <CommandInput placeholder="Enter Problem Name" />
          <CommandEmpty>No problem found.</CommandEmpty>
          <CommandGroup>
            {problems.map((problem) => (
              <CommandItem
                key={problem.id}
                value={problem.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === problem.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {problem.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
