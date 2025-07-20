"use client";

import React, { useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Rating from "@mui/material/Rating";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import useFilterStore from "@/app/store/useFilterStore";

const Filter = () => {
  const {
    searchTerm,
    selectedCategory,
    ratingValue,
    experience,
    availableToday,
    categories,
    gender,

    setSearchTerm,
    setGender,
    setSelectedCategory,
    setRatingValue,
    setExperience,
    setAvailableToday,
    setCategories,
  } = useFilterStore();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/Categories");
        const data = await res.json();
        setCategories(data); // Set globally
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchCategories();
  }, [setCategories]);

  return (
    <div className="col-span-2 space-y-6 p-4 border rounded-xl border-gray-200 bg-white">
      {/* Search Input */}
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          type="text"
          placeholder="Search"
          className="focus-visible:ring-primary mt-1"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Category Selection */}
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger id="category" className="w-full mt-1">
            <SelectValue placeholder="Select a Category" />
          </SelectTrigger>
          <SelectContent className="border-primary">
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Rating Filter */}
      <div>
        <Label htmlFor="rating">Minimum Rating</Label>
        <Rating
          id="rating"
          value={ratingValue}
          onChange={(_, newValue) => {
            if (newValue !== null) setRatingValue(newValue);
          }}
          className="mt-2"
        />
      </div>
      {/* Gender Filter */}
      <div>
        <Label className="mb-2 block">Gender</Label>
        <RadioGroup
          value={gender}
          onValueChange={setGender}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Male" id="male" />
            <Label htmlFor="male">Male</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Female" id="female" />
            <Label htmlFor="female">Female</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Experience Slider */}
      <div>
        <Label htmlFor="experience">Minimum Experience (Years)</Label>
        <div className="flex items-center gap-4 mt-2">
          <Slider
            id="experience"
            value={[experience]}
            max={30}
            step={1}
            onValueChange={(value) => setExperience(value[0])}
          />
          <span className="text-sm text-gray-600">{experience}+</span>
        </div>
      </div>

      {/* Availability Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="availableToday"
          checked={availableToday}
          onCheckedChange={(checked) => setAvailableToday(checked === true)}
        />
        <Label htmlFor="availableToday">Available Today</Label>
      </div>
    </div>
  );
};

export default Filter;
