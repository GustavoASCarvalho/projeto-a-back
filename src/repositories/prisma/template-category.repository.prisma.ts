import { template_category } from '@prisma/client';
import { prisma } from '../../prisma';
import { TemplateCategoryRepository } from '../interfaces/template-category.interface';

export class PrismaTemplateCategoryRepository
	implements TemplateCategoryRepository
{
	async list(): Promise<template_category[]> {
		return await prisma.template_category.findMany();
	}
}
