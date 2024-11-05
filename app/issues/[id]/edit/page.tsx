import IssueForm from '../../_components/IssueForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'



const EditIssuePage = async ({params}: {params: Promise<{ id: string }>}) => {
  const idIssue = (await params).id;
  if (!idIssue) notFound();
  const id = parseInt(idIssue, 10);
  if (isNaN(id)) return notFound();


  const issue = await prisma.issue.findUnique({
        where: {id: id}
    });
    if(!issue) notFound();
  return (
    <IssueForm issue={issue} />
  )
}

export default EditIssuePage
