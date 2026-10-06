interface CoursePart {
    name: string
    exerciseCount: number
}

const Total = ({ courseParts }: { courseParts: CoursePart[] }) => {
    const totalExercise = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)
    return (
        <p>
            Number of exercises {totalExercise}
        </p>
    )
}

export default Total