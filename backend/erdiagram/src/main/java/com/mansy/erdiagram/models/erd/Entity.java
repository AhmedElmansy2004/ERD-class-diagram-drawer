package com.mansy.erdiagram.models.erd;

public record Entity(String name, Attribute[] attributes, boolean isWeak) {}
