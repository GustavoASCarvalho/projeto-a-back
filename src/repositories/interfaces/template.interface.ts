import { template, variable } from '@prisma/client';

export interface TemplateRepository {
	create(
		data: Partial<template>,
		variables: Partial<variable>[] | null,
		categories: number[],
	): Promise<template>;
	list(): Promise<template[]>;
	getBySlug(slug: string): Promise<template | null>;
}
