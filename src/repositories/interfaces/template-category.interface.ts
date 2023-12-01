import { template_category } from '@prisma/client';

export interface TemplateCategoryRepository {
	list(): Promise<template_category[]>;
}
