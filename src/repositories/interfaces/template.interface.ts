import { template, variable } from '@prisma/client';
import { TemplateModel } from '../models/template.model';

export interface TemplateRepository {
	create(
		data: Partial<template>,
		variables: Partial<variable>[] | null,
		categories: number[],
	): Promise<template>;
	list(): Promise<template[]>;
	getBySlug(slug: string): Promise<TemplateModel | null>;
}
